package unpsjb.labprog.backend.business.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.business.repositories.Customer_Repository;
import unpsjb.labprog.backend.model.Customer;

@Service

public class Customer_Service {

    @Autowired
    private Customer_Repository customer_Repository;

    public Customer findById(int id) {
        return this.customer_Repository.findById(id).orElse(null);
    }

    public Page<Customer> findByPage(int page, int size) {
        return customer_Repository.findAll(PageRequest.of(page, size));
    }

    public List<Customer> search(String term) {
        return customer_Repository.search("%" + term + "%");
    }

    @Transactional
    public Customer save(Customer aCustomer) {
        return this.customer_Repository.save(aCustomer);
    }

    @Transactional
    public void delete(int aCustomerId) {
        this.customer_Repository.deleteById(aCustomerId);
    }

}