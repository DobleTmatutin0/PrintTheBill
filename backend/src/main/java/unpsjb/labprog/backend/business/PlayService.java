package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
<<<<<<< HEAD
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
=======
import org.springframework.transaction.annotation.Transactional;
>>>>>>> 96a1e9aabc9624310ac5d3ed46a6e7788ad81063

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

    public Page<Play> findByPage(int page, int size){
        //List<Play> result = new ArrayList<>();
        return repository.findAll(
            PageRequest.of(page, size)
        );
        //return result;
    @Transactional
    public Play save(Play aPlay) {
        return repository.save(aPlay);
    }
}
