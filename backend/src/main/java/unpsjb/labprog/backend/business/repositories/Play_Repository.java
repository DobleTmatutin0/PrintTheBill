package unpsjb.labprog.backend.business.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Play;

@Repository

public interface Play_Repository extends JpaRepository<Play, Integer> {
    // Default Methods

    @Query("SELECT p FROM Play p WHERE p.code = ?1")
    Optional<Play> findByCode(String aPlayCode);

    @Query("SELECT p FROM Play p WHERE UPPER(p.name) LIKE ?1")
    List<Play> search(String term);
}
