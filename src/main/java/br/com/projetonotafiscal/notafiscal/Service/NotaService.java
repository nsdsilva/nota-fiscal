package br.com.projetonotafiscal.notafiscal.Service;

import br.com.projetonotafiscal.notafiscal.DTO.NotaDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Cliente;
import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import br.com.projetonotafiscal.notafiscal.Entity.Nota;
import br.com.projetonotafiscal.notafiscal.Entity.Produto;
import br.com.projetonotafiscal.notafiscal.Infra.ValidacaoException;
import br.com.projetonotafiscal.notafiscal.Repository.ClienteRepository;
import br.com.projetonotafiscal.notafiscal.Repository.ItensRepository;
import br.com.projetonotafiscal.notafiscal.Repository.NotaRepository;
import br.com.projetonotafiscal.notafiscal.Repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class NotaService {

    @Autowired
    private NotaRepository repository;
    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ItensRepository itensRepository;

    private ProdutoRepository produtoRepository;



    public Nota salvar(NotaDTO dto) {
        Nota nota = new Nota(dto);

        if (dto.getCliente() == null) {
            throw new ValidacaoException("É necessário informar um cliente .");
        }

        if (!clienteRepository.existsById(dto.getCliente())) {
            throw new ValidacaoException("O cliente informado não existe.");
        }

        Cliente cliente = clienteRepository.getReferenceById(dto.getCliente());

        Random random = new Random();
        int numeroAleatorio = random.nextInt();
        nota.setNumero(numeroAleatorio);

        int ordenacao = 1;
        BigDecimal somaTotal = BigDecimal.ZERO;

        for (Itens item : dto.getItens()) {
           item.setOrdenacao(ordenacao++);

           item.setValor_total(item.getQuantidade().multiply(item.getProduto().getValor_unitario()));
           somaTotal = somaTotal.add(item.getValor_total());
        }

        nota.setValor_total(somaTotal);

        nota = repository.save(nota);

        return nota;
    }
}
