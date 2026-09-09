import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabin from "../features/cabins/AddCabin";
import CabinsOperations from "../features/cabins/CabinsOperations";
import SortBy from "../ui/SortBy";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinsOperations />
        <SortBy
          options={[
            { value: "name-asc", label: "sort by name (A-Z)" },
            { value: "name-desc", label: "sort by name (Z-A)" },
            { value: "regularPrice-asc", label: "sort by price (low first)" },
            { value: "regularPrice-desc", label: "sort by price (max first)" },
            { value: "maxCapacity-asc", label: "sort by capacity (low first)" },
            {
              value: "maxCapacity-desc",
              label: "sort by capacity (max first)",
            },
          ]}
        />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
