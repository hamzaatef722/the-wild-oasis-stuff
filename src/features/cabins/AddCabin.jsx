import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  // Version after using compound component pattern

  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );

  //  Version before using compound component pattern

  // const [isOpenModal, setIsOpenModal] = useState(false);

  // return (
  //   <div>
  //     <Button onClick={() => setIsOpenModal((show) => !show)}>
  //       add new cabin
  //     </Button>
  //     {isOpenModal && (
  //       <Modal onClose={() => setIsOpenModal(false)}>
  //         <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
  //       </Modal>
  //     )}
  //   </div>
  // );
}

export default AddCabin;
