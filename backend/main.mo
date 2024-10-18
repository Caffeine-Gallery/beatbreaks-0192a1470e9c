import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor TravelAgent {
    // Define the HolidayPackage type
    public type HolidayPackage = {
        id: Nat;
        name: Text;
        description: Text;
        price: Nat;
        duration: Nat;
        clubsIncluded: [Text];
        imageUrl: Text;
    };

    private stable var nextId: Nat = 0;
    private stable var packagesEntries: [(Nat, HolidayPackage)] = [];

    private var packages = HashMap.HashMap<Nat, HolidayPackage>(0, Nat.equal, Nat.hash);

    public shared func addPackage(name: Text, description: Text, price: Nat, duration: Nat, clubsIncluded: [Text], imageUrl: Text): async Nat {
        let id = nextId;
        nextId += 1;

        let newPackage: HolidayPackage = {
            id;
            name;
            description;
            price;
            duration;
            clubsIncluded;
            imageUrl;
        };

        packages.put(id, newPackage);
        id
    };

    public query func getPackage(id: Nat): async ?HolidayPackage {
        packages.get(id)
    };

    public query func listPackages(): async [HolidayPackage] {
        Iter.toArray(packages.vals())
    };

    system func preupgrade() {
        packagesEntries := Iter.toArray(packages.entries());
    };

    system func postupgrade() {
        packages := HashMap.fromIter<Nat, HolidayPackage>(packagesEntries.vals(), 0, Nat.equal, Nat.hash);
    };
}
