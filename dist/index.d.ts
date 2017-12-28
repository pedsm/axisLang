export default function access(axisCode: string, data: string | object | any[] | undefined | null): void;
export interface Token {
    value: string;
    index: number;
}
export declare function tokenize(axisCode: string): Token[];
