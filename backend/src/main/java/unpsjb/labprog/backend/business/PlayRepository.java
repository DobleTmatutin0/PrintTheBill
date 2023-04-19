package unpsjb.labprog.backend.business;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Play;

@Repository
public interface PlayRepository extends CrudRepository<Play, Integer>{
    // Solo los metodos por defecto.
}