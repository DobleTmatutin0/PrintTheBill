package unpsjb.labprog.backend.business.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import unpsjb.labprog.backend.model.PlayType;
import unpsjb.labprog.backend.business.repositories.PlayType_Repository;

@Service

public class PlayType_Service {

    @Autowired
    private PlayType_Repository playType_Repository;

    public List<PlayType> findAll() {
        List<PlayType> result = new ArrayList<>();
        playType_Repository.findAll().forEach(playType -> result.add(playType));
        
        return result; 
    }

    public List<PlayType> search(String term) {
        return playType_Repository.search("%" + term.toLowerCase() + "%");
    }

    // @Transactional
    // public PlayType save(PlayType aPlayType) {
    //     return playType_Repository.save(aPlayType);
    // }

}
