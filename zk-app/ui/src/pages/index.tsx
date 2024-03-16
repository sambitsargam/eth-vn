import GradientBG from '../components/GradientBG.js';
import styles from '../styles/Home.module.css';
import heroMinaLogo from '../../public/assets/hero-mina-logo.svg';
import arrowRightSmall from '../../public/assets/arrow-right-small.svg';

import Sidebar from "@/components/Sidebar";
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Mina,
  PublicKey,
  fetchAccount,
  Field,
  Bool,
  Poseidon,
} from 'o1js';
import ZkappWorkerClient from './zkappWorkerClient';
import { Report, Requirements } from '../../../contracts/src/Add';
import { ReportFormInput, RequirementsFormInput, buildReportFromFormInput, buildRequirementsFromFormInput, reportFromJson, requirementsFromJson } from "@/util";
import NewRequest from "./new-request";
import Proofs from "./proof";
import VerifyProofs from "./verify-proof";

let transactionFee = 0.1;

export default function NewReport() {

  let [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    currentNum: null as null | Field,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
    hash: ""
  });
  let [form1output, setForm1output] = useState("")
  let [form2output, setForm2output] = useState("")
  let [form3output, setForm3output] = useState("")
  let [form4output, setForm4output] = useState("")

  async function publishReport(report: Report) {
    doShowOverlay()

    myLog('Publishing account request report hash...');

    await state.zkappWorkerClient!.fetchAccount({
      publicKey: state.publicKey!,
    });


    myLog('creating transaction...');
    await state.zkappWorkerClient!.createPublishReportTransaction(report);

    myLog('creating proof...');
    await state.zkappWorkerClient!.proveTransaction();

    myLog('getting transaction JSON...');
    const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON();

    myLog('requesting send transaction...');
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: '',
      },
    });

    myLog(
      'See transaction at https://berkeley.minaexplorer.com/transaction/' + hash
    );
    doHideOverlay()


    setState({ ...state, creatingTransaction: false, hash: hash });
    setForm1output(JSON.stringify(report, null, 2))
  }

  async function publishProofs(report: Report, requirements: Requirements) {
    doShowOverlay()

    myLog('Publishing proof...');

    await state.zkappWorkerClient!.fetchAccount({
      publicKey: state.publicKey!,
    });

    try {

      myLog('creating transaction...');
      await state.zkappWorkerClient!.createPublishProofsTransaction(report, requirements);

      myLog('creating proof...');
      await state.zkappWorkerClient!.proveTransaction();

      myLog('getting transaction JSON...');
      const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON();

      myLog('requesting send transaction...');
      var { hash } = await (window as any).mina.sendTransaction({
        transaction: transactionJSON,
        feePayer: {
          fee: transactionFee,
          memo: '',
        },
      });

    } catch (e) {
      alert('failed to generate proof: ' + e)
    }

    myLog(
      'See transaction at https://berkeley.minaexplorer.com/transaction/' + hash
    );
    doHideOverlay()


    setState({ ...state, creatingTransaction: false, hash: hash });
    setForm3output("ok")
  }

  async function publishVerifyProofs(requirements: Requirements) {
    doShowOverlay()

    myLog('Verifying proof...');

    await state.zkappWorkerClient!.fetchAccount({
      publicKey: state.publicKey!,
    });

    try {
      const curRequirementsHash = await state.zkappWorkerClient!.getRequirementsHash()
      const expectedRequirementsHash = Poseidon.hash([
        new Field(requirements.organizationId),
        new Field(requirements.verifyTime),
        new Field(requirements.minrecyclableamount),
        new Field(requirements.maxrecyclableamount),
        new Bool(requirements.allowConditionA).toField(),
        new Bool(requirements.allowConditionB).toField(),
        new Bool(requirements.allowConditionC).toField(),
      ])

      if (JSON.stringify(curRequirementsHash) != JSON.stringify(expectedRequirementsHash)) {
        alert('FAILED TO VERIFY!')
      } else {
        myLog('Requirements verified!')
        await new Promise(r => setTimeout(r, 2000));
      }



    } catch (e) {
      alert('failed to verify proof: ' + e)
    }
    doHideOverlay()


    // setState({ ...state, creatingTransaction: false, hash: hash });
    setForm4output("ok")
  }
  useEffect(() => {

    // Null checks for possibly null variables
const showverifierBtn = document.getElementById('verifierBtn');
const showadminBtn = document.getElementById('adminBtn');
const showorgaizationBtn = document.getElementById('orgaizationBtn');

if (showverifierBtn) {
  showverifierBtn.addEventListener('click', () => {
    toggleVisibility('.verifier');
  });
}

if (showadminBtn) {
  showadminBtn.addEventListener('click', () => {
    toggleVisibility('.admin');
  });
}

if (showorgaizationBtn) {
  showorgaizationBtn.addEventListener('click', () => {
    toggleVisibility('.organization');
  });
}

// Explicitly define type for the parameter
const toggleVisibility = (visibleClass: string) => {
  // Null checks for possibly null elements
  const doctorDiv = document.querySelector('.verifier');
  const employerDiv = document.querySelector('.admin');
  const patientDiv = document.querySelector('.organization');

  if (doctorDiv && employerDiv && patientDiv) {
    doctorDiv.classList.remove('visible');
    employerDiv.classList.remove('visible');
    patientDiv.classList.remove('visible');

    document.querySelector(visibleClass)?.classList.add('visible');
  }
};


    async function timeout(seconds: number): Promise<void> {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
      });
    }

    (async () => {
      doShowOverlay()
      if (!state.hasBeenSetup) {
        myLog('Loading web worker...');
        console.log('Loading web worker...');
        const zkappWorkerClient = new ZkappWorkerClient();
        await timeout(5);

        myLog('Done loading web worker');

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;

        if (mina == null) {
          setState({ ...state, hasWallet: false });
          return;
        }
        const publicKeyBase58: string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);

        myLog('public key: ', publicKey.toBase58());

        myLog('checking if account exists...');
        const res = await zkappWorkerClient.fetchAccount({
          publicKey: publicKey!,
        });
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();

        myLog('compiling zkApp');
        await zkappWorkerClient.compileContract();
        myLog('zkApp compiled');

        const zkappPublicKey = PublicKey.fromBase58(
          'B62qj5vSsQiuugm8oYkYf5mXgaPQf32JZ9AaGuS9QsCpC19PEHLUjhs'
        );

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);

        myLog('getting zkApp state...');
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey });
        myLog('READY!')
        doHideOverlay()
        // const currentNum = await zkappWorkerClient.getNum();
        // myLog('current state:', currentNum.toString());

        setState({
          ...state,
          zkappWorkerClient,
          hasWallet: true,
          hasBeenSetup: true,
          publicKey,
          zkappPublicKey,
          accountExists,
          // currentNum,
        });

      }


    })();
  }, []);


  const [organizationId, setorganizationId] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [recyclableamount, setrecyclableamount] = useState("");
  const [condition_1, setCondition_1] = useState("");
  const [condition_2, setCondition_2] = useState("");
  const [condition_3, setCondition_3] = useState("");

  const [showOverlay, setShowOverlay] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);

  function doShowOverlay() {
    setLogs([])
    setShowOverlay(true)
  }

  function doHideOverlay() {
    setShowOverlay(false)
  }

  const myLog = (...message: any) => {
    console.log(...message)
    setLogs((prevLogs) => [...(prevLogs || []), message]);
  };


  function submitRequest(requirementsInput: RequirementsFormInput) {
    const req = buildRequirementsFromFormInput(requirementsInput)
    setForm2output(JSON.stringify(req, null, 2))
  }

  function submitProofs(reportJsonString: string, requirementsJsonString: string) {
    publishProofs(reportFromJson(reportJsonString), requirementsFromJson(requirementsJsonString))
  }

  function submitVerifyProofs(requirementsJsonString: string) {
    publishVerifyProofs(requirementsFromJson(requirementsJsonString))
  }

  return (
    <div className="App bg-white-50 dark:bg-zinc-900">
      {showOverlay && (
        <div className="overlay">
          <button onClick={doHideOverlay}>Hide</button>
          <div className="overlay-content">
            <ul ><code className="mt-5">
              {logs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </code></ul>
          </div>
        </div>
      )}
      <Sidebar />
      <div className="generate-keys">
        <div className="doctor">
        <h1>Organization Request - Report with Conditions</h1>

        <form
          className="main-form"
          onSubmit={(e: any) => {
            publishReport(buildReportFromFormInput({
              organizationId: organizationId,
              validUntil,
              recyclableamount,
              hasConditionA: condition_1,
              hasConditionB: condition_2,
              hasConditionC: condition_3,
            }));


            e.preventDefault();
          }}
        >

          <div className="organization-id mt-5">
            <h3>Organization ID</h3>
            <input
              className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="condition-1"
              type="text"
              placeholder="123"
              onChange={(e) => {
                setorganizationId(e.target.value);
              }}
            ></input>
          </div>

          <div className="datetime mt-5">
            <h3>Valid Until</h3>
            <input
              className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="condition-1"
              type="text"
              placeholder="YYYY-MM-DD"
              onChange={(e) => {
                setValidUntil(e.target.value);
              }}
            ></input>
          </div>

          <div className="blood-pressure mt-5">
            <h3>Recyclable Amount</h3>
            <input
              className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="condition-1"
              type="text"
              placeholder="90"
              onChange={(e) => {
                setrecyclableamount(e.target.value);
              }}
            ></input>
          </div>

          <div className="coditions mt-5">
            <h3>Condition #1</h3>
            <input
              className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="condition-1"
              type="text"
              placeholder="True"
              onChange={(e) => {
                setCondition_1(e.target.value);
              }}
            ></input>
          </div>

          <div className="coditions mt-5">
            <h3>Condition #2</h3>
            <input
              className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="condition-1"
              type="text"
              placeholder="True"
              onChange={(e) => {
                setCondition_2(e.target.value);
              }}
            ></input>
          </div>

          <div className="coditions mt-5">
            <h3>Condition #3</h3>
            <input
              className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="condition-1"
              type="text"
              placeholder="True"
              onChange={(e) => {
                setCondition_3(e.target.value);
              }}
            ></input>
          </div>
          <div className='mt-16'>
            <button
              className="button-main right hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Generate report
            </button>
          </div>
        </form>
        {form1output && (<>
          <h1>Report for Organization</h1>
          <a className="my-5" href={'https://berkeley.minaexplorer.com/transaction/' + state.hash}><code>{state.hash}</code></a>
          <pre className="bg-gray-100 text-gray-800 p-4 rounded-md overflow-auto shadow-md">
            <code>{form1output}</code>
          </pre>
        </>)}
        </div>

        <div className="employer">
        <h1>Admin - Request Account Proof from Organization</h1>
        <NewRequest submitRequest={submitRequest} />
        {form2output && (<>
          <h1>Requirements request for Organization</h1>
          <pre className="bg-gray-100 text-gray-800 p-4 rounded-md overflow-auto shadow-md">
            <code>{form2output}</code>
          </pre>
        </>)}
        
        <h1>Admin - Verify Account Proof</h1>
        <VerifyProofs submitVerifyProofs={submitVerifyProofs} />
        {form4output && (<>
          <h1>Account proof verified!</h1>
          {/* <a className="my-5" href={'https://berkeley.minaexplorer.com/transaction/' + state.hash}><code>{state.hash}</code></a> */}
        </>)}

        </div>

        <div className="patient">
        <h1>Organization - Submit Account Proof</h1>
        <Proofs submitProofs={submitProofs} />
        {form3output && (<>
          <h1>Account proof submitted!</h1>
          <a className="my-5" href={'https://berkeley.minaexplorer.com/transaction/' + state.hash}><code>{state.hash}</code></a>
        </>)}

        <form className="main-form" action="" method="get">
            <h2>Requests</h2>

            <div className="tertiary-group">
                <h4 className="green">PASS</h4>
                <p>Company Name: <span>Fake Starbucks</span></p>
                <p>Accommodations: <span>Reserved Parking</span></p>
                <p>Status: <span className="orange">Not Sent</span></p>

                <button
                className="button-main middle right hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                >
                    ENCRYPT AND PUBLISH
                </button>
            </div>

            <div className="tertiary-group">
                <h4 className="red">NOT PASS</h4>
                <p>Company Name: <span>Fake Starbucks</span></p>
                <p>Accommodations: <span>Flexible Work Hours</span></p>
                <p>Status: <span className="orange">Not Sent</span></p>

                <button
                className="button-main middle right hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                >
                    ENCRYPT AND PUBLISH
                </button>
            </div>
        </form>

        </div>

        </div>
      </div>


  );

};
