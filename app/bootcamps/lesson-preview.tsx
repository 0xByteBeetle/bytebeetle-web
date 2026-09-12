// Website previews of existing course examples, not new lesson implementations.
// Rechecked 2026-09-12 against the original repositories, without source edits:
// Foundation: week-02-evm-and-solidity/module-02-calldata-meets-evm/
// instructor/solutions/exercise2: forge test --offline -vvvv (2/2 passed).
// Advanced: week-01-advanced-token-standards/module3/instructor/solutions/foundry:
// forge test --offline --match-test testPermitCreatesAllowanceButDoesNotTransferTokens -vvvv (1/1 passed).
// Tables summarize the observed return values and assertions; they are not terminal output.

export function LessonPreview({ advanced = false }: { advanced?: boolean }) {
  return (
    <section className="two-column-detail lesson-preview" aria-labelledby="lesson-preview-heading">
      <div>
        <p className="eyebrow">A question from the course</p>
        <h2 id="lesson-preview-heading">{advanced ? "You signed a permit. Did any tokens move?" : "Same code. Different caller. What changes?"}</h2>
        <p>{advanced ? "A wallet signature and a token transfer are different operations. The distinction matters when a vault or router uses a permit." : "A contract’s behavior depends on more than its source code. The execution context determines who it sees as the sender, and which address it considers its own."}</p>
      </div>
      <div className="detail-stack">
        {advanced ? <>
          <p>In this example, the owner starts with 1,000 tokens and signs permission for a vault to spend 125. A relayer submits that permission to the token contract.</p>
          <table className="lesson-observation">
            <caption>Observed state in the permit example</caption>
            <thead><tr><th scope="col">Token state</th><th scope="col">Before</th><th scope="col">After</th></tr></thead>
            <tbody>
              <tr><th scope="row">Vault’s allowance</th><td>0</td><td>125 tokens</td></tr>
              <tr><th scope="row">Owner’s balance</th><td>1,000 tokens</td><td>1,000 tokens</td></tr>
              <tr><th scope="row">Vault’s balance</th><td>0</td><td>0</td></tr>
              <tr><th scope="row">Owner’s nonce</th><td>0</td><td>1</td></tr>
            </tbody>
          </table>
          <p>The permission changed, but the balances did not. Spending requires a separate transfer operation, even when an application combines both steps in one transaction. The nonce has advanced, so the same signed permission cannot be used again.</p>
          <p className="lesson-question">Now ask: if the later transfer fails, does the permission survive? The answer depends on whether the two operations share one reverting transaction.</p>
        </> : <>
          <p>A caller invokes contract A. A then uses contract B’s code to read the sender and the current contract address. Compare a read-only external call with a delegatecall.</p>
          <table className="lesson-observation">
            <caption>Observed identities in the call-context example</caption>
            <thead><tr><th scope="col">How A invokes B</th><th scope="col">Sender seen</th><th scope="col">Current address</th></tr></thead>
            <tbody>
              <tr><th scope="row">Static call</th><td>Contract A</td><td>Contract B</td></tr>
              <tr><th scope="row">Delegatecall</th><td>Original caller</td><td>Contract A</td></tr>
            </tbody>
          </table>
          <p>The static call runs in B’s context. The delegatecall uses B’s code while keeping A’s context, including the sender that A received. That is the starting point for understanding how a proxy can use another contract’s logic.</p>
          <p className="lesson-question">Before you run the next example, ask: if that delegated code writes to storage, whose storage changes?</p>
        </>}
      </div>
    </section>
  );
}
