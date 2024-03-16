import { Field,
  SmartContract,
  state,
  State,
  method,
  Poseidon,
  Bool,
  Struct } from 'o1js';

  // lets create a class that contains the report
  export class Report extends Struct({
    requiredhash: Field,
    validUntil: Field,
    recyclableamount: Field,
    address: Field,
    hasConditionA: Bool,
    hasConditionB: Bool,
    hasConditionC: Bool,
  }) {}

  // class for requirements
  export class Requirements extends Struct({
    requiredhash: Field,
    verifyTime: Field,
    minrecyclableamount: Field,
    maxrecyclableamount: Field,
    allowConditionA: Bool,
    allowConditionB: Bool,
    allowConditionC: Bool,
  }) {}
  
  function hashReport(report: Report) {
    return Poseidon.hash(Report.toFields(report));
  }

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


  // method to verify the proof
  @method publishProof(
    report: Report,
    requirementsToCheck: Requirements
  ) {
    const hash = hashReport(report);

    this.reporthash.assertEquals(hash);

    report.requiredhash.assertEquals(requirementsToCheck.requiredhash);

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
        new Field(requirementsToCheck.requiredhash),
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
        new Field(requirementsToCheck.requiredhash),
        new Field(requirementsToCheck.verifyTime),
        new Field(requirementsToCheck.minrecyclableamount),
        new Field(requirementsToCheck.maxrecyclableamount),
        new Bool(requirementsToCheck.allowConditionA).toField(),
        new Bool(requirementsToCheck.allowConditionB).toField(),
        new Bool(requirementsToCheck.allowConditionC).toField(),
      ]
    );

    const currentRequirementsHash = this.verifiedRequirementsHash.get()

    console.log('incoming requirements hash: ', requirementsHashToCheck)
    console.log('current requirements hash: ', currentRequirementsHash)

    currentRequirementsHash.assertGreaterThan(Field(0));
    this.verifiedRequirementsHash.assertEquals(requirementsHashToCheck);

    this.emitEvent('verified', requirementsHashToCheck);


  }
}