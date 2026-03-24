package unpsjb.labprog.backend.presenter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

import unpsjb.labprog.backend.business.services.Play_Service;
import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.Play;

@Controller
@RequestMapping("plays")

public class Play_Presenter {
    
    @Autowired
    private Play_Service playService;

    @GetMapping()
    public ResponseEntity<Object> findAll() {
        return Response.ok(playService.findAll());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") int aPlayId) {
        Play aPlayOrNull = playService.findById(aPlayId);
        return (aPlayOrNull != null)
            ? Response.ok(aPlayOrNull)
            : Response.notFound("The play with id " + aPlayId + " was not found");
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<Object> findByCode(@PathVariable("code") String aPlayCode) {
        Play aPlayOrNull = playService.findByCode(aPlayCode);
        return (aPlayOrNull != null)
            ? Response.ok(aPlayOrNull)
            : Response.notFound("The play with code " + aPlayCode + " was not found");
    }

    @GetMapping("/search/{term}")
    public ResponseEntity<Object> search(@PathVariable("term") String term) { 
        return Response.ok(playService.search(term));
    }

    @GetMapping("/page")
    public ResponseEntity<Object> findByPage(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return Response.ok(playService.findByPage(page, size));
    }

    @PostMapping()
    public ResponseEntity<Object> create(@RequestBody Play aPlay) {
        if (aPlay.getId() != 0) {
            return Response.error(
                aPlay,
                "A new play cant already have an ID"
            );
        }
        return Response.ok(playService.save(aPlay));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@RequestBody Play aPlay) {
        if (aPlay.getId() <= 0) {
            return Response.error(
                aPlay,
                "Invalid ID"
            );
        }
        return Response.ok(playService.save(aPlay));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
        playService.delete(id);
        return Response.ok("The play with id " + id + " has been successfully deleted");
    }
}
