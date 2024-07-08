export const indexFMGRecords = <
  TRecordID extends number,
  TRecord extends { i: TRecordID },
>(
  records: TRecord[],
) => {
  return records.reduce(
    (records, record) => {
      records[record.i] = record;
      return records;
    },
    {} as Record<TRecordID, TRecord>,
  );
};
