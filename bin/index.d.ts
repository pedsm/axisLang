export declare function parse(axisCode: string | Token[], dataInput: string | object | any[] | undefined | null): any[];
export declare function access(axisCode: string | Token[], dataInput: string | object | any[] | undefined | null): any[];
export interface Token {
    value: string;
    index: number;
}
export declare function tokenize(axisCode: string): Token[];
export declare function flatten(arr: any[]): any[];
