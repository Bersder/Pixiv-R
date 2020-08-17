export default class Validator {
  validateResult: string[] = [];

  strategys: any = {
    notEmpty(value: string, errMsg: string) {
      if (!value)
        return errMsg
    },
    notContains(value: string, target: string, errMsg: string) {
      if (value.indexOf(target) > -1)
        return errMsg;
    },
    isEmail(value: string, errMsg: string) {
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))
        return errMsg
    },
    isQQ(value: string, errMsg: string) {
      if (!/^[1-9]\d{4,12}$/.test(value))
        return errMsg;
    },
    isLink(value: string, errMsg: string) {
      if (!/^https?:\/\/(([0-9a-z-]+\.)+[0-9a-z]+(\/#)?)((\/[0-9a-z-_.~!*]+)*\/?)((\?[0-9a-z_&=]*)?)$/i.test(value))
        return errMsg;
    },
    isEn(value: string, errMsg: string) {
      if (!/^\w+$/.test(value))
        return errMsg;
    },
    maxLen(value: string, len: string, errMsg: string) {
      if (value.length > parseInt(len))
        return errMsg;
    }
  };

  check(value: string, rules: any[], optional = false): void {
    rules = (rules instanceof Array) ? rules : [rules];
    if (optional && !value) return;
    for (let rule of rules) {
      let strategyArgs: string[] = rule.strategy.split(':');
      let errMsg: string = rule.errMsg;
      let strategy: string = strategyArgs.shift() || '';
      strategyArgs.unshift(value);
      strategyArgs.push(errMsg);
      let result = this.strategys[strategy].apply(null, strategyArgs);
      result && this.validateResult.push(result)
    }
  }

  checkResult(): string | void {
    for (let item of this.validateResult)
      if (item)
        return item;
  }
}
