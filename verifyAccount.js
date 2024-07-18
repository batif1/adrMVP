const {
  Account,
  PublicAccount,
  NetworkType,
  TransferTransaction,
  Deadline,
  Address,
  Mosaic,
  MosaicId,
  UInt64,
  PlainMessage,
  RepositoryFactoryHttp
} = require("@dhealth/sdk");

const verifyAccount = async (req, res) => {
  try {
    const { patientAddress, symptoms, verifierAccountPrivateKey, recipientRawAddress } = req.body;

    const patientAccount = PublicAccount.createFromPublicKey(patientAddress, NetworkType.MAIN_NET);
    const verifierAccount = Account.createFromPrivateKey(verifierAccountPrivateKey, NetworkType.MAIN_NET);

    const data = JSON.stringify({
      patient: patientAccount.address.plain(),
      symptoms
    });

    const signature = verifierAccount.signData(data);
    const publicAccount = PublicAccount.createFromPublicKey(verifierAccount.publicKey, NetworkType.MAIN_NET);
    const isValid = publicAccount.verifySignature(data, signature);

    if (!isValid) {
      return res.status(400).json({ message: "Signature is invalid" });
    }

    const recipientAddress = Address.createFromRawAddress(recipientRawAddress);

    const epochAdjustment = 1616978397;
    const transferTransaction = TransferTransaction.create(
      Deadline.create(epochAdjustment),
      recipientAddress,
      [new Mosaic(new MosaicId("39E0C49FA322A459"), UInt64.fromUint(0))],
      PlainMessage.create('This account is verified.'),
      NetworkType.MAIN_NET,
      UInt64.fromUint(0),
    );

    const networkGenerationHash = "ED5761EA890A096C50D3F50B7C2F0CCB4B84AFC9EA870F381E84DDE36D04EF16";
    const signedTransaction = verifierAccount.sign(
      transferTransaction,
      networkGenerationHash
    );
    const transactionhash = signedTransaction.hash;
    const repositoryFactory = new RepositoryFactoryHttp("http://dual-03.dhealth.cloud:3000");
    const transactionRepository = repositoryFactory.createTransactionRepository();
    const response = await transactionRepository.announce(signedTransaction).toPromise();
    
    res.json({ response, transactionhash});
  } catch (error) {
    console.error('Error verifying account:', error);
    res.status(500).json({ message: 'Error verifying account', error });
  }
};

module.exports = verifyAccount;
