import { Field,
  SmartContract,
  state,
  State,
  method,
  Poseidon,
  Bool,
  Struct, 
  Provable} from 'o1js';

  // lets create a class that contains the report
  export class Report extends Struct({
    organizationId: Field,
    validUntil: Field,
    recyclableamount: Field,
    hasConditionA: Bool,
    hasConditionB: Bool,
    hasConditionC: Bool,
  }) {}

  // class for requirements
  export class Requirements extends Struct({
    organizationId: Field,
    verifyTime: Field,
    minrecyclableamount: Field,
    maxrecyclableamount: Field,
    allowConditionA: Bool,
    allowConditionB: Bool,
    allowConditionC: Bool,
  }) {}
  
  // this is the hash function for the report to be published
  function hashReport(report: Report) {
    return Poseidon.hash(Report.toFields(report));
  }


  // this is the main class for the contract
  export class RecycleCompany extends SmartContract {
    events = {
      verified: Field,
    };

  
  // here the state fields are available
  @state(Field) reporthash = State<Field>();
  @state(Field) verifiedRequirementsHash = State<Field>();

  // lets initialize the required hash and requirements ahasg
  init() {
    super.init();
    this.reporthash.set(Field(0));
    this.verifiedRequirementsHash.set(Field(0));
  }

  // organiztaion publishing their report
  @method publishReport(report: Report) {
    this.reporthash.set(hashReport(report));
  }


  // method to publish the proof
  @method publishProof(
    report: Report,
    requirementsToCheck: Requirements
  ) {
    const hash = hashReport(report);

    this.reporthash.assertEquals(hash);

    report.organizationId.assertEquals(requirementsToCheck.organizationId);

    requirementsToCheck.verifyTime.assertLessThanOrEqual(report.validUntil);

    report.recyclableamount.assertGreaterThanOrEqual(
      requirementsToCheck.minrecyclableamount
    );
    report.recyclableamount.assertLessThanOrEqual(
      requirementsToCheck.maxrecyclableamount
    );

    requirementsToCheck.allowConditionA
      .and(report.hasConditionA)
      .or(requirementsToCheck.allowConditionB.and(report.hasConditionB))
      .or(requirementsToCheck.allowConditionC.and(report.hasConditionC))
      .assertTrue();

    this.verifiedRequirementsHash.set(
      Poseidon.hash([
        new Field(requirementsToCheck.organizationId),
        new Field(requirementsToCheck.verifyTime),
        new Field(requirementsToCheck.minrecyclableamount),
        new Field(requirementsToCheck.maxrecyclableamount),
        new Bool(requirementsToCheck.allowConditionA).toField(),
        new Bool(requirementsToCheck.allowConditionB).toField(),
        new Bool(requirementsToCheck.allowConditionC).toField(),
      ])
    );
  }

  // here is the method to verify the organization having 
  @method VerifyOrganization(requirementsToCheck: Requirements) {
    const requirementsHashToCheck = Poseidon.hash(
      [
        new Field(requirementsToCheck.organizationId),
        new Field(requirementsToCheck.verifyTime),
        new Field(requirementsToCheck.minrecyclableamount),
        new Field(requirementsToCheck.maxrecyclableamount),
        new Bool(requirementsToCheck.allowConditionA).toField(),
        new Bool(requirementsToCheck.allowConditionB).toField(),
        new Bool(requirementsToCheck.allowConditionC).toField(),
      ]
    );

    const currentRequirementsHash = this.verifiedRequirementsHash.get()

    // Provable.log('incoming requirements hash: ', requirementsHashToCheck)
    // console.log('current requirements hash: ', currentRequirementsHash)

    currentRequirementsHash.assertGreaterThan(Field(0));
    this.verifiedRequirementsHash.assertEquals(requirementsHashToCheck);

    this.emitEvent('verified', requirementsHashToCheck);


  }
}