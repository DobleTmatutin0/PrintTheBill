package unpsjb.labprog.backend.business.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import unpsjb.labprog.backend.model.PlayType;

public interface PlayType_Repository extends JpaRepository<PlayType, Integer>{
    // Default methods

    @Query("SELECT pt FROM PlayType pt WHERE LOWER(pt.type) LIKE ?1")
    List<PlayType> search(String term);
}
