import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface HolidayPackage {
  'id' : bigint,
  'duration' : bigint,
  'clubsIncluded' : Array<string>,
  'name' : string,
  'description' : string,
  'imageUrl' : string,
  'price' : bigint,
}
export interface _SERVICE {
  'addPackage' : ActorMethod<
    [string, string, bigint, bigint, Array<string>, string],
    bigint
  >,
  'getPackage' : ActorMethod<[bigint], [] | [HolidayPackage]>,
  'listPackages' : ActorMethod<[], Array<HolidayPackage>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
