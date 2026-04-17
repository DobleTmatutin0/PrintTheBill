package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.services.Customer_Service;

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
}