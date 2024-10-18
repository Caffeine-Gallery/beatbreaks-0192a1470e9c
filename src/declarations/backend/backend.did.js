export const idlFactory = ({ IDL }) => {
  const HolidayPackage = IDL.Record({
    'id' : IDL.Nat,
    'duration' : IDL.Nat,
    'clubsIncluded' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
    'description' : IDL.Text,
    'imageUrl' : IDL.Text,
    'price' : IDL.Nat,
  });
  return IDL.Service({
    'addPackage' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Nat, IDL.Vec(IDL.Text), IDL.Text],
        [IDL.Nat],
        [],
      ),
    'getPackage' : IDL.Func([IDL.Nat], [IDL.Opt(HolidayPackage)], ['query']),
    'listPackages' : IDL.Func([], [IDL.Vec(HolidayPackage)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
