// AvailableCabinsTable.jsx
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import AvailableCabinRow from "./AvailableCabinRow";

function AvailableCabinsTable({ cabins, isFetching }) {
  if (isFetching) return <Spinner />;
  if (!cabins || cabins.length === 0)
    return <Empty resourceName="available cabins for these dates" />;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={cabins}
        render={(cabin) => <AvailableCabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}

export default AvailableCabinsTable;
