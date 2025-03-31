export default cases => key => (cases[key] ?? cases['base'] ?? (() => ''))()
