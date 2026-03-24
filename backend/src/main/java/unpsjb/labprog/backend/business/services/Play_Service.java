package unpsjb.labprog.backend.business.services;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import unpsjb.labprog.backend.model.Play;
import unpsjb.labprog.backend.business.repositories.Play_Repository;

@Service

public class Play_Service {
    
    @Autowired
    private Play_Repository playRepository;

    public List<Play> findAll() {
        List<Play> result = new ArrayList<>();
        playRepository.findAll().forEach(play -> result.add(play));
        return result;
    }

    public Play findById(int aPlayId) {
        return playRepository.findById(aPlayId).orElse(null);
    }

    public Play findByCode(String aPlayCode) {
        return playRepository.findByCode(aPlayCode).orElse(null);
    }

    public Page<Play> findByPage(int page, int size) {
        return playRepository.findAll(PageRequest.of(page, size));
    }

    public List<Play> search(String term) {
        return playRepository.search("%" + term.toUpperCase() + "%");
    }

    @Transactional
    public Play save(Play aPlay) {
        return playRepository.save(aPlay);
    }

    @Transactional
    public void delete(int aPlayId) {
        playRepository.deleteById(aPlayId);
    }
}
