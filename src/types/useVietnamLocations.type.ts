/** @format */

export type Ward = { code: string; name: string };
export type District = { code: string; name: string; wards: Ward[] };
export type Province = { code: string; name: string; districts: District[] };
export type VietnamLocationData = Province[];
