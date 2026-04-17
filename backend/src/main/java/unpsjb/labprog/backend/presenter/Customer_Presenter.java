package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import unpsjb.labprog.backend.model.Customer;
import unpsjb.labprog.backend.business.services.Customer_Service;
import unpsjb.labprog.backend.Response;

@RestController
@RequestMapping("customers")

public class Customer_Presenter {

    @Autowired
    private Customer_Service customer_Service;

    @GetMapping("/page")
    public ResponseEntity<Object> findByPage(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return Response.ok(customer_Service.findByPage(page, size));
    }

    @GetMapping("/search/{term}")
    public ResponseEntity<Object> search(@PathVariable("term") String term) {
        return Response.ok(customer_Service.search(term));
    }

    @PostMapping()
    public ResponseEntity<Object> create(@RequestBody Customer aCustomer) {
        return Response.ok((customer_Service.save(aCustomer)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
        this.customer_Service.delete(id);
        return Response.ok("the customer with id " + id + " has been successfully deleted");
    }

}