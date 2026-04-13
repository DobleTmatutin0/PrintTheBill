package unpsjb.labprog.backend.business.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Customer;

@Repository

public interface Customer_Repository extends JpaRepository<Customer, Integer>{
    
    @Query("SELECT c FROM Customer c WHERE c.name like ?1")
    List<Customer> search(String term);
}
