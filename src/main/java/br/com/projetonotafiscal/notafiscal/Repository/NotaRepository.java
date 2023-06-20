package br.com.projetonotafiscal.notafiscal.Repository;

import br.com.projetonotafiscal.notafiscal.Entity.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotaRepository extends JpaRepository<Nota, Long> {
}
