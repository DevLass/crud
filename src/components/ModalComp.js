import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Box} from "@chakra-ui/react"
import { useState } from "react";

function ModalComp({data, setData, dataEdit,isOpen, onClose}) {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.name || "");
    
    const handleSave = () => {
        if (!name || !email) return;

        if (emailAlreadyExists()){
            return alert("E-mail já cadastrado!");
        }
    }

    const emailAlreadyExists = () => {
        if(dataEdit.email !== email && data?.length){
            return data.find((item) => item.email === email);
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = {name, email};
        }

        const newDataArray = !Object.key(dataEdit).length
        ? [...(data ? data : []), {name, email}]
        : [...(data ? data : [])];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    }
    
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cadastro de Clients</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormControl display="flex" flexDir="column" gap={4}>
                        <Box>
                            <FormLabel>Nome</FormLabel>
                            <Input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </Box>
                    </FormControl>
                </ModalBody>
                <ModalFooter justifyContent="start">
                    <Button colorScheme="green" mr={3} onclick={handleSave}>
                        Salvar
                    </Button>
                    <Button colorScheme="red" onclick={onClose}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default ModalComp;
  