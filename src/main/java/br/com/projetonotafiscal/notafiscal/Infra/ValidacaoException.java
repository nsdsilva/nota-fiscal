package br.com.projetonotafiscal.notafiscal.Infra;

public class ValidacaoException extends RuntimeException {

    public ValidacaoException(String mensagem) {
        super(mensagem);
    }
}
