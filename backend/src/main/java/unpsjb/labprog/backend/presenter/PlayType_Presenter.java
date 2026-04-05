package unpsjb.labprog.backend.presenter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;

import unpsjb.labprog.backend.business.services.PlayType_Service;
import unpsjb.labprog.backend.Response;

@Controller
@RequestMapping("playtype")

public class PlayType_Presenter {
    
    @Autowired
    private PlayType_Service playType_Service;

    @GetMapping()
    public ResponseEntity<Object> getAll() {
        return Response.ok(playType_Service.findAll());
    }

    @GetMapping("/search/{term}")
    public ResponseEntity<Object> search(@PathVariable("term") String term) {
        return Response.ok(playType_Service.search(term));
    }
}
