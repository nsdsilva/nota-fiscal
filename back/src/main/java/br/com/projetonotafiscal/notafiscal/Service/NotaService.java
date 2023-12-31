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
            if (item.getQuantidade() == null) {
                throw new ValidacaoException("É necessário adicionar a quantidade dos produtos na nota fiscal.");
            }
            if (item.getProduto() == null) {
                throw new ValidacaoException("É necessário adicionar ao menos um produto na nota fiscal.");
            }
            if (!produtoRepository.existsById(item.getProduto().getId())) {
                throw new ValidacaoException("O produto selecionado não existe.");
            }

           item.setOrdenacao(ordenacao++);

           Long valorUnitario = produtoRepository.findByValorUnitarioProduto(item.getProduto().getId());

           item.setValor_total(item.getQuantidade().multiply(BigDecimal.valueOf(valorUnitario)));
           somaTotal = somaTotal.add(item.getValor_total());

           item.setNota(nota);
        }

        nota.setValor_total(somaTotal);
        nota = repository.save(nota);

        return nota;
    }

    //método para atualizar nota
    public void atualizar(NotaDTO dto) {
        Nota nota = repository.getReferenceById(dto.getId());
        List<Itens> list = itensRepository.findAllByIdItens(nota);
        BigDecimal somaTotal = BigDecimal.ZERO;

        for (Itens item : list) { //Percorrendo a lista de itens que já esta salva no banco de dados
            if (!dto.getItens().contains(itensRepository.getReferenceById(item.getId()))) {
                itensRepository.deleteById(item.getId());
            }
            for (Itens itemDTO : dto.getItens()) { //Percorrendo a lista do dto que estou recebendo
                if (itemDTO.getId() == null) {
                    int ordenacao = itensRepository.findByUltimaOrdencao(nota);
                    item.setOrdenacao(ordenacao++);
                    itemDTO.setOrdenacao(ordenacao++);

                    Long valorUnitario = produtoRepository.findByValorUnitarioProduto(item.getProduto().getId());

                    item.setValor_total(item.getQuantidade().multiply(BigDecimal.valueOf(valorUnitario)));
                    somaTotal = somaTotal.add(item.getValor_total());
                    itemDTO.setValor_total(item.getQuantidade().multiply(BigDecimal.valueOf(valorUnitario)));

                    item.setNota(nota);

                    break;
                }
                if (item.getId() == itemDTO.getId()) {
                    item.setQuantidade(itemDTO.getQuantidade());

                    Long valorUnitario = produtoRepository.findByValorUnitarioProduto(item.getProduto().getId());

                    item.setValor_total(item.getQuantidade().multiply(BigDecimal.valueOf(valorUnitario)));
                    somaTotal = somaTotal.add(item.getValor_total());

                    break;
                }
            }
        }

        nota.setValor_total(somaTotal);
        nota.atualizar(dto);
    }


    //método para listar todas as notas
    public List<Nota> listarTodos() {
        List<Nota> notas = repository.findAll();

        return notas;
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
