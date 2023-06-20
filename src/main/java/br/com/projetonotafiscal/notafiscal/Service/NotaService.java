package br.com.projetonotafiscal.notafiscal.Service;

import br.com.projetonotafiscal.notafiscal.DTO.NotaDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Cliente;
import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import br.com.projetonotafiscal.notafiscal.Entity.Nota;
import br.com.projetonotafiscal.notafiscal.Infra.ValidacaoException;
import br.com.projetonotafiscal.notafiscal.Repository.ClienteRepository;
import br.com.projetonotafiscal.notafiscal.Repository.ItensRepository;
import br.com.projetonotafiscal.notafiscal.Repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class NotaService {

    @Autowired
    private NotaRepository repository;
    @Autowired
    private ClienteRepository clienteRepository;

    private ItensRepository itensRepository;


    public Nota salvar(NotaDTO dto) {
        Nota nota = new Nota(dto);

        if (dto.getCliente() == null) {
            throw new ValidacaoException("É necessário informar um clinete.");
        }

        if (!clienteRepository.existsById(dto.getCliente().getId())) {
            throw new ValidacaoException("O cliente informado não existe.");
        }

        Random random = new Random();
        int numeroAleatorio = random.nextInt();
        String codigoAleatorio = String.valueOf(numeroAleatorio);

        nota.setNumero(codigoAleatorio);


        return nota;
    }



}
