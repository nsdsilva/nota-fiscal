package br.com.projetonotafiscal.notafiscal.Service;

import br.com.projetonotafiscal.notafiscal.DTO.ItensDTO;
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
    @Autowired
    private ProdutoRepository produtoRepository;


    public Nota salvar(NotaDTO dto) {
        Nota nota = new Nota(dto);

        if (dto.getCliente() == null) {
            throw new ValidacaoException("É necessário informar um clinete.");
        }

        if (!clienteRepository.existsById(dto.getCliente())) {
            throw new ValidacaoException("O cliente informado não existe.");
        }

        Cliente cliente = clienteRepository.getReferenceById(dto.getCliente());

        Random random = new Random();
        int numeroAleatorio = random.nextInt();
        String codigoAleatorio = String.valueOf(numeroAleatorio);
        nota.setNumero(codigoAleatorio);

        for (Itens i : dto.getItens()) {
            itensRepository.save(i);
        }

        nota = repository.save(nota);

        return nota;
    }




}
