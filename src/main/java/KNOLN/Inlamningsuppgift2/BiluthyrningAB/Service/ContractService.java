package KNOLN.Inlamningsuppgift2.BiluthyrningAB.Service;

import KNOLN.Inlamningsuppgift2.BiluthyrningAB.Objects.Car;
import KNOLN.Inlamningsuppgift2.BiluthyrningAB.Objects.Contract;
import KNOLN.Inlamningsuppgift2.BiluthyrningAB.Repositories.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractService {
    @Autowired
    private ContractRepository repo;

    public Contract addContract(Contract contract) {
        return repo.save(contract);
    }
    public void deleteContract(Contract contract) {
        repo.delete(contract);
    }
    public List<Contract> getContracts(){
        return repo.findAll();
    }

    public Contract getContractById(long id) {
        return repo.findByContractNumber(id);
    }

    public List<Contract> getContractByUserEmail(String email) {
        return repo.findByUserEmail(email);
    }
}
