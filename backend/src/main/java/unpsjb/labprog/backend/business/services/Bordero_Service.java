package unpsjb.labprog.backend.business.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.business.repositories.Bordero_Repository;
import unpsjb.labprog.backend.model.Bordero;

@Service

public class Bordero_Service {
    
    @Autowired
    private Bordero_Repository bordero_Repository;

    public List<Bordero> findAll() {
        List<Bordero> resutl = new ArrayList<>();
        bordero_Repository.findAll().forEach(e -> resutl.add(e));
        return resutl;
    }

    public Bordero findById(int id) {
        return bordero_Repository.findById(id).orElse(null);
    }

    public Page<Bordero> findByPage(int page, int size) {
        return bordero_Repository.findAll(PageRequest.of(page, size));
    }

    @Transactional
    public Bordero save(Bordero aBordero) {
       return bordero_Repository.save(aBordero); 
    }

    @Transactional
    public void delete(int id) {
        this.bordero_Repository.deleteById(id);
    }
}