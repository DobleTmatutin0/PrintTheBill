package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.PlayService;
import unpsjb.labprog.backend.model.Play;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("plays")
public class PlayPresenter {

  @Autowired
  PlayService service;

  @RequestMapping(method=RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(value="/id/{id}", method=RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {    
    Play aPlayOrNull = service.findById(id);
    return (aPlayOrNull != null)?
      Response.ok(aPlayOrNull):
      Response.notFound();
  }

  @RequestMapping(value="/{code}", method=RequestMethod.GET)
  public ResponseEntity<Object> findByCode(@PathVariable("code") String code) {    
    Play aPlayOrNull = service.findByCode(code);
    return (aPlayOrNull != null)?
      Response.ok(aPlayOrNull, "Obra recuperada correctamente"):
      Response.notFound("Obra no existe");
  }

  @RequestMapping(method=RequestMethod.PUT)
  public ResponseEntity<Object> save(@RequestBody Play aPlay) {    
    return Response.ok(
      service.save(aPlay), 
      "Obra actualizada correctamente"
      );
  }
}
