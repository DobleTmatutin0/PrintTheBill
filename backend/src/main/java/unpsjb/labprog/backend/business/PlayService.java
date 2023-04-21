package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.model.Play;

@Service
public class PlayService {
    
    @Autowired
    PlayRepository repository;

    public List<Play> findAll(){
        List<Play> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Play findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Play findByCode(String code) {
        return repository.findByCode(code).orElse(null);
    }
}
