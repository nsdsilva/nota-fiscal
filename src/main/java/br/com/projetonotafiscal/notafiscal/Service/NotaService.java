package br.com.projetonotafiscal.notafiscal.Service;

import br.com.projetonotafiscal.notafiscal.DTO.NotaDTO;
import br.com.projetonotafiscal.notafiscal.DTO.ProdutoDTO;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    @Autowired
    private ProdutoRepository produtoRepository;



    //método para salvar a nota
    public Nota salvar(NotaDTO dto) {
        Nota nota = new Nota(dto);

        if (dto.getCliente() == null) {
            throw new ValidacaoException("É necessário informar um cliente .");
        }

        if (!clienteRepository.existsById(dto.getCliente().getId())) {
            throw new ValidacaoException("O cliente informado não existe.");
        }

        Cliente cliente = clienteRepository.getReferenceById(dto.getCliente().getId());

        Random random = new Random();
        int numeroAleatorio = random.nextInt();
        nota.setNumero(numeroAleatorio);

        int ordenacao = 1;
        BigDecimal somaTotal = BigDecimal.ZERO;

        for (Itens item : dto.getItens()) {
           item.setOrdenacao(ordenacao++);

            Long valor = item.getProduto().getId();
            Long valorUnitario = produtoRepository.findByValorUnitarioProduto(valor);

           item.setValor_total(item.getQuantidade().multiply(BigDecimal.valueOf(valorUnitario)));
           somaTotal = somaTotal.add(item.getValor_total());
        }

        nota.setValor_total(somaTotal);

        nota = repository.save(nota);

        return nota;
    }

    //método para atualizar nota
    public void atualizar(@org.jetbrains.annotations.NotNull NotaDTO dto) {
        Nota nota = repository.getReferenceById(dto.getId());

        int ordenacao = Integer.parseInt(nota.toString());
        BigDecimal somaTotal = BigDecimal.ZERO;

        for (Itens item : dto.getItens()) {
            item.setOrdenacao(ordenacao++);

            Long valor = item.getProduto().getId();
            Long valorUnitario = produtoRepository.findByValorUnitarioProduto(valor);

            item.setValor_total(item.getQuantidade().multiply(BigDecimal.valueOf(valorUnitario)));
            somaTotal = somaTotal.add(item.getValor_total());
        }

        dto.setValor_total(somaTotal);

        nota.atualizar(dto);
    }

    //método para listar todas as notas
    public Page<Nota> listarTodos(Pageable paginacao) {
        Page page = repository.findAll(paginacao).map(NotaDTO :: new);

        return page;
    }

    //método para listar a nota de acordo com o seu ID
    public Nota detalhar(Long id) {
        Nota nota = repository.getReferenceById(id);

        return nota;
    }

    //método para excluir a nota de acordo com o ID
    public void excluir(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        }
    }
}
