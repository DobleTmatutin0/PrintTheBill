package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.services.Bordero_Service;
import unpsjb.labprog.backend.model.Bordero;

@RestController
@RequestMapping("bordero")

public class Bordero_Presenter {

    @Autowired
    private Bordero_Service bordero_Service;

    @GetMapping()
    public ResponseEntity<Object> findAll() {
       return Response.ok(bordero_Service.findAll()); 
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Bordero aBorderoOrNull = bordero_Service.findById(id);
        return (aBorderoOrNull != null)
        ? Response.ok(aBorderoOrNull)
        : Response.notFound();
    }

    @PostMapping()
    public ResponseEntity<Object> create(@RequestBody Bordero aBordero) {
        return Response.ok(bordero_Service.save(aBordero), "Bordero creado correctamente");
    }
}
