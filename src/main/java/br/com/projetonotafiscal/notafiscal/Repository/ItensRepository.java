package br.com.projetonotafiscal.notafiscal.Repository;

import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItensRepository extends JpaRepository<Itens, Long> {
}
