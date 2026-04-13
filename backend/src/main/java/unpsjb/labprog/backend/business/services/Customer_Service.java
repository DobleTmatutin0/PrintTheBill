package unpsjb.labprog.backend.business.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.business.repositories.Customer_Repository;
import unpsjb.labprog.backend.model.Customer;

@Service

public class Customer_Service {

    @Autowired
    private Customer_Repository customer_Repository;

    public List<Customer> search(String term) {
        return customer_Repository.search("%" + term + "%");
    }
}