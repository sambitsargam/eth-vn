import {Field, Mina, PublicKey, fetchAccount } from 'o1js';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { RecycleCompany, Report, Requirements } from '../../../contracts/src/Add';

const state = {
  RecycleCompany: null as null | typeof RecycleCompany,
  zkapp: null as null | RecycleCompany,
  transaction: null as null | Transaction,
};

// ---------------------------------------------------------------------------------------

const functions = {
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.Network(
      'https://archive.berkeley.minaexplorer.com'
    );
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async (args: {}) => {
    const { RecycleCompany } = await import('../../../contracts/build/src/Add.js');
    state.RecycleCompany = RecycleCompany;
  },
  compileContract: async (args: {}) => {
    await state.RecycleCompany!.compile();
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58('B62qj5vSsQiuugm8oYkYf5mXgaPQf32JZ9AaGuS9QsCpC19PEHLUjhs');
  },
  getRequirementsHash: async (args: {}) => {
    const currentNum = await state.zkapp!.verifiedRequirementsHash.fetch();
    return JSON.stringify(currentNum!.toJSON());
  },
  createPublishReportTransaction: async (args: { report: Report }) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp!.publishReport(args.report);
    });
    state.transaction = transaction;
  },
  createPublishProofsTransaction: async (args: { report: Report, requirements: Requirements }) => {
    const transaction = await Mina.transaction(() => {
      state.zkapp!.publishProof(args.report, args.requirements);
    });
    state.transaction = transaction;
  },
  createVerifyProofsTransaction: async (args: { requirements: Requirements }) => {
    console.log('createVerifyProofsTransaction: ', args.requirements)
    const transaction = await Mina.transaction(() => {
      state.zkapp!.VerifyOrganization(args.requirements);
    });
    state.transaction = transaction;
  },
  proveTransaction: async (args: {}) => {
    await state.transaction!.prove();
  },
  getTransactionJSON: async (args: {}) => {
    return state.transaction!.toJSON();
  },
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number;
  fn: WorkerFunctions;
  args: any;
};

export type ZkappWorkerReponse = {
  id: number;
  data: any;
};
if (typeof window !== 'undefined') {
  addEventListener(
    'message',
    async (event: MessageEvent<ZkappWorkerRequest>) => {
      const returnData = await functions[event.data.fn](event.data.args);

      const message: ZkappWorkerReponse = {
        id: event.data.id,
        data: returnData,
      };
      postMessage(message);
    }
  );
}
