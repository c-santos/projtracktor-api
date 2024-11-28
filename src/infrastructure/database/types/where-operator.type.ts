export type WhereOperators = {
    notIn?: string[];
    greaterThan?: number | string;
    lessThan?: number;
    in?: string[];
    like?: string;
    between?: [string | number, string | number];
};
