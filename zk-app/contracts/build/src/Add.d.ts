import { SmartContract, State } from 'o1js';
declare const Report_base: (new (value: {
    organizationId: import("o1js/dist/node/lib/field").Field;
    validUntil: import("o1js/dist/node/lib/field").Field;
    recyclableamount: import("o1js/dist/node/lib/field").Field;
    hasConditionA: import("o1js/dist/node/lib/bool").Bool;
    hasConditionB: import("o1js/dist/node/lib/bool").Bool;
    hasConditionC: import("o1js/dist/node/lib/bool").Bool;
}) => {
    organizationId: import("o1js/dist/node/lib/field").Field;
    validUntil: import("o1js/dist/node/lib/field").Field;
    recyclableamount: import("o1js/dist/node/lib/field").Field;
    hasConditionA: import("o1js/dist/node/lib/bool").Bool;
    hasConditionB: import("o1js/dist/node/lib/bool").Bool;
    hasConditionC: import("o1js/dist/node/lib/bool").Bool;
}) & {
    _isStruct: true;
} & import("o1js/dist/node/snarky").ProvablePure<{
    organizationId: import("o1js/dist/node/lib/field").Field;
    validUntil: import("o1js/dist/node/lib/field").Field;
    recyclableamount: import("o1js/dist/node/lib/field").Field;
    hasConditionA: import("o1js/dist/node/lib/bool").Bool;
    hasConditionB: import("o1js/dist/node/lib/bool").Bool;
    hasConditionC: import("o1js/dist/node/lib/bool").Bool;
}> & {
    toInput: (x: {
        organizationId: import("o1js/dist/node/lib/field").Field;
        validUntil: import("o1js/dist/node/lib/field").Field;
        recyclableamount: import("o1js/dist/node/lib/field").Field;
        hasConditionA: import("o1js/dist/node/lib/bool").Bool;
        hasConditionB: import("o1js/dist/node/lib/bool").Bool;
        hasConditionC: import("o1js/dist/node/lib/bool").Bool;
    }) => {
        fields?: import("o1js/dist/node/lib/field").Field[] | undefined;
        packed?: [import("o1js/dist/node/lib/field").Field, number][] | undefined;
    };
    toJSON: (x: {
        organizationId: import("o1js/dist/node/lib/field").Field;
        validUntil: import("o1js/dist/node/lib/field").Field;
        recyclableamount: import("o1js/dist/node/lib/field").Field;
        hasConditionA: import("o1js/dist/node/lib/bool").Bool;
        hasConditionB: import("o1js/dist/node/lib/bool").Bool;
        hasConditionC: import("o1js/dist/node/lib/bool").Bool;
    }) => {
        organizationId: string;
        validUntil: string;
        recyclableamount: string;
        hasConditionA: boolean;
        hasConditionB: boolean;
        hasConditionC: boolean;
    };
    fromJSON: (x: {
        organizationId: string;
        validUntil: string;
        recyclableamount: string;
        hasConditionA: boolean;
        hasConditionB: boolean;
        hasConditionC: boolean;
    }) => {
        organizationId: import("o1js/dist/node/lib/field").Field;
        validUntil: import("o1js/dist/node/lib/field").Field;
        recyclableamount: import("o1js/dist/node/lib/field").Field;
        hasConditionA: import("o1js/dist/node/lib/bool").Bool;
        hasConditionB: import("o1js/dist/node/lib/bool").Bool;
        hasConditionC: import("o1js/dist/node/lib/bool").Bool;
    };
    empty: () => {
        organizationId: import("o1js/dist/node/lib/field").Field;
        validUntil: import("o1js/dist/node/lib/field").Field;
        recyclableamount: import("o1js/dist/node/lib/field").Field;
        hasConditionA: import("o1js/dist/node/lib/bool").Bool;
        hasConditionB: import("o1js/dist/node/lib/bool").Bool;
        hasConditionC: import("o1js/dist/node/lib/bool").Bool;
    };
};
export declare class Report extends Report_base {
}
declare const Requirements_base: (new (value: {
    organizationId: import("o1js/dist/node/lib/field").Field;
    verifyTime: import("o1js/dist/node/lib/field").Field;
    minrecyclableamount: import("o1js/dist/node/lib/field").Field;
    maxrecyclableamount: import("o1js/dist/node/lib/field").Field;
    allowConditionA: import("o1js/dist/node/lib/bool").Bool;
    allowConditionB: import("o1js/dist/node/lib/bool").Bool;
    allowConditionC: import("o1js/dist/node/lib/bool").Bool;
}) => {
    organizationId: import("o1js/dist/node/lib/field").Field;
    verifyTime: import("o1js/dist/node/lib/field").Field;
    minrecyclableamount: import("o1js/dist/node/lib/field").Field;
    maxrecyclableamount: import("o1js/dist/node/lib/field").Field;
    allowConditionA: import("o1js/dist/node/lib/bool").Bool;
    allowConditionB: import("o1js/dist/node/lib/bool").Bool;
    allowConditionC: import("o1js/dist/node/lib/bool").Bool;
}) & {
    _isStruct: true;
} & import("o1js/dist/node/snarky").ProvablePure<{
    organizationId: import("o1js/dist/node/lib/field").Field;
    verifyTime: import("o1js/dist/node/lib/field").Field;
    minrecyclableamount: import("o1js/dist/node/lib/field").Field;
    maxrecyclableamount: import("o1js/dist/node/lib/field").Field;
    allowConditionA: import("o1js/dist/node/lib/bool").Bool;
    allowConditionB: import("o1js/dist/node/lib/bool").Bool;
    allowConditionC: import("o1js/dist/node/lib/bool").Bool;
}> & {
    toInput: (x: {
        organizationId: import("o1js/dist/node/lib/field").Field;
        verifyTime: import("o1js/dist/node/lib/field").Field;
        minrecyclableamount: import("o1js/dist/node/lib/field").Field;
        maxrecyclableamount: import("o1js/dist/node/lib/field").Field;
        allowConditionA: import("o1js/dist/node/lib/bool").Bool;
        allowConditionB: import("o1js/dist/node/lib/bool").Bool;
        allowConditionC: import("o1js/dist/node/lib/bool").Bool;
    }) => {
        fields?: import("o1js/dist/node/lib/field").Field[] | undefined;
        packed?: [import("o1js/dist/node/lib/field").Field, number][] | undefined;
    };
    toJSON: (x: {
        organizationId: import("o1js/dist/node/lib/field").Field;
        verifyTime: import("o1js/dist/node/lib/field").Field;
        minrecyclableamount: import("o1js/dist/node/lib/field").Field;
        maxrecyclableamount: import("o1js/dist/node/lib/field").Field;
        allowConditionA: import("o1js/dist/node/lib/bool").Bool;
        allowConditionB: import("o1js/dist/node/lib/bool").Bool;
        allowConditionC: import("o1js/dist/node/lib/bool").Bool;
    }) => {
        organizationId: string;
        verifyTime: string;
        minrecyclableamount: string;
        maxrecyclableamount: string;
        allowConditionA: boolean;
        allowConditionB: boolean;
        allowConditionC: boolean;
    };
    fromJSON: (x: {
        organizationId: string;
        verifyTime: string;
        minrecyclableamount: string;
        maxrecyclableamount: string;
        allowConditionA: boolean;
        allowConditionB: boolean;
        allowConditionC: boolean;
    }) => {
        organizationId: import("o1js/dist/node/lib/field").Field;
        verifyTime: import("o1js/dist/node/lib/field").Field;
        minrecyclableamount: import("o1js/dist/node/lib/field").Field;
        maxrecyclableamount: import("o1js/dist/node/lib/field").Field;
        allowConditionA: import("o1js/dist/node/lib/bool").Bool;
        allowConditionB: import("o1js/dist/node/lib/bool").Bool;
        allowConditionC: import("o1js/dist/node/lib/bool").Bool;
    };
    empty: () => {
        organizationId: import("o1js/dist/node/lib/field").Field;
        verifyTime: import("o1js/dist/node/lib/field").Field;
        minrecyclableamount: import("o1js/dist/node/lib/field").Field;
        maxrecyclableamount: import("o1js/dist/node/lib/field").Field;
        allowConditionA: import("o1js/dist/node/lib/bool").Bool;
        allowConditionB: import("o1js/dist/node/lib/bool").Bool;
        allowConditionC: import("o1js/dist/node/lib/bool").Bool;
    };
};
export declare class Requirements extends Requirements_base {
}
export declare class RecycleCompany extends SmartContract {
    events: {
        verified: typeof import("o1js/dist/node/lib/field").Field & ((x: string | number | bigint | import("o1js/dist/node/lib/field").Field | import("o1js/dist/node/lib/field").FieldVar | import("o1js/dist/node/lib/field").FieldConst) => import("o1js/dist/node/lib/field").Field);
    };
    reporthash: State<import("o1js/dist/node/lib/field").Field>;
    verifiedRequirementsHash: State<import("o1js/dist/node/lib/field").Field>;
    init(): void;
    publishReport(report: Report): void;
    publishProof(report: Report, requirementsToCheck: Requirements): void;
    VerifyOrganization(requirementsToCheck: Requirements): void;
}
export {};
