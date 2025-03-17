export interface Options {
  allowed: string[];
  prefixes: string[];
  disallowed: string[];
  regularExpressions: string[];
  separator: string;
  maxSections: number | null;
  msgPrefixNotAllowed: string;
  msgBranchDisallowed: string;
  msgRegexNotMatched: string;
  msgSeperatorRequired: string;
  msgSectionsOver: string;
  quiet?: boolean;
}

export interface Args extends Partial<Options> {
  config?: string | null;
}

export type ValidationType =
  | 'prefix'
  | 'disallowed'
  | 'regex'
  | 'separator'
  | 'sections';

export interface Validation {
  isValid: boolean;
  type: ValidationType;
}
