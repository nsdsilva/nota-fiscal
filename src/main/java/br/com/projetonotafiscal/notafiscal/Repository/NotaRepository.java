package br.com.projetonotafiscal.notafiscal.Repository;

import br.com.projetonotafiscal.notafiscal.Entity.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface NotaRepository extends JpaRepository<Nota, Long> {

    @Query("select valor_total from Nota where id = :id")
    BigDecimal findbyValorTotalNota(Long id);

}