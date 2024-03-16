var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, SmartContract, state, State, method, Poseidon, Bool, Struct } from 'o1js';
// lets create a class that contains the report
export class Report extends Struct({
    requiredhash: Field,
    validUntil: Field,
    recyclableamount: Field,
    address: Field,
    hasConditionA: Bool,
    hasConditionB: Bool,
    hasConditionC: Bool,
}) {
}
// class for requirements
export class Requirements extends Struct({
    requiredhash: Field,
    verifyTime: Field,
    minrecyclableamount: Field,
    maxrecyclableamount: Field,
    allowConditionA: Bool,
    allowConditionB: Bool,
    allowConditionC: Bool,
}) {
}
// this is the hash function for the report to be published
function hashReport(report) {
    return Poseidon.hash(Report.toFields(report));
}
// this is the main class for the contract
export class RecycleCompany extends SmartContract {
    constructor() {
        super(...arguments);
        this.events = {
            verified: Field,
        };
        // here the state fields are available
        this.reporthash = State();
        this.verifiedRequirementsHash = State();
    }
    // lets initialize the required hash and requirements ahasg
    init() {
        super.init();
        this.reporthash.set(Field(0));
        this.verifiedRequirementsHash.set(Field(0));
    }
    // organiztaion publishing their report
    publishReport(report) {
        this.reporthash.set(hashReport(report));
    }
    // method to publish the proof
    publishProof(report, requirementsToCheck) {
        const hash = hashReport(report);
        this.reporthash.assertEquals(hash);
        report.requiredhash.assertEquals(requirementsToCheck.requiredhash);
        requirementsToCheck.verifyTime.assertLessThanOrEqual(report.validUntil);
        report.recyclableamount.assertGreaterThanOrEqual(requirementsToCheck.minrecyclableamount);
        report.recyclableamount.assertLessThanOrEqual(requirementsToCheck.maxrecyclableamount);
        requirementsToCheck.allowConditionA
            .and(report.hasConditionA)
            .or(requirementsToCheck.allowConditionB.and(report.hasConditionB))
            .or(requirementsToCheck.allowConditionC.and(report.hasConditionC))
            .assertTrue();
        this.verifiedRequirementsHash.set(Poseidon.hash([
            new Field(requirementsToCheck.requiredhash),
            new Field(requirementsToCheck.verifyTime),
            new Field(requirementsToCheck.minrecyclableamount),
            new Field(requirementsToCheck.maxrecyclableamount),
            new Bool(requirementsToCheck.allowConditionA).toField(),
            new Bool(requirementsToCheck.allowConditionB).toField(),
            new Bool(requirementsToCheck.allowConditionC).toField(),
        ]));
    }
    // here is the method to verify the organization having 
    VerifyOrganization(requirementsToCheck) {
        const requirementsHashToCheck = Poseidon.hash([
            new Field(requirementsToCheck.requiredhash),
            new Field(requirementsToCheck.verifyTime),
            new Field(requirementsToCheck.minrecyclableamount),
            new Field(requirementsToCheck.maxrecyclableamount),
            new Bool(requirementsToCheck.allowConditionA).toField(),
            new Bool(requirementsToCheck.allowConditionB).toField(),
            new Bool(requirementsToCheck.allowConditionC).toField(),
        ]);
        const currentRequirementsHash = this.verifiedRequirementsHash.get();
        // Provable.log('incoming requirements hash: ', requirementsHashToCheck)
        // console.log('current requirements hash: ', currentRequirementsHash)
        currentRequirementsHash.assertGreaterThan(Field(0));
        this.verifiedRequirementsHash.assertEquals(requirementsHashToCheck);
        this.emitEvent('verified', requirementsHashToCheck);
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], RecycleCompany.prototype, "reporthash", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], RecycleCompany.prototype, "verifiedRequirementsHash", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Report]),
    __metadata("design:returntype", void 0)
], RecycleCompany.prototype, "publishReport", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Report,
        Requirements]),
    __metadata("design:returntype", void 0)
], RecycleCompany.prototype, "publishProof", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Requirements]),
    __metadata("design:returntype", void 0)
], RecycleCompany.prototype, "VerifyOrganization", null);
//# sourceMappingURL=Add.js.map