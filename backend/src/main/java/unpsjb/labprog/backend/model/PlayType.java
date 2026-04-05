package unpsjb.labprog.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity

@Getter
@Setter
@NoArgsConstructor

@Table(name = "play_type")

public class PlayType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(unique = true)
    private String type;
    
}
