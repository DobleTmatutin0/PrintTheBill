package unpsjb.labprog.backend.model;

import java.util.Calendar;
import java.util.Collection;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity

@Getter
@Setter
@NoArgsConstructor

public class Bordero {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    private Calendar date;

    @ManyToOne
    private Customer customer;

    @OneToMany(cascade = CascadeType.ALL)
    private Collection<Performance> performances;
}