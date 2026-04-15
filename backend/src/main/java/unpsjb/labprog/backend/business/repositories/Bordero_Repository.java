package unpsjb.labprog.backend.business.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Bordero;

@Repository

public interface Bordero_Repository extends JpaRepository<Bordero, Integer>{
    // default methods
}
