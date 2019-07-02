class CommonEntity {
  private shared;

  public constructor(shared) {
    this.shared = shared;
  }

  public async search(query) {
    const result = await this.shared.search(query);

    if (result.block) {
      return result.block;
    }

    if (result.transaction) {
      return result.transaction;
    }

    return result;
  }

  public async statistic() {
    const data = await this.shared.getStatistic();

    return data;
  }
}

export default CommonEntity;
